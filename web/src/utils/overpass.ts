export interface OverpassWay {
    id: number;
    tags: Record<string, string>;
    nodes: number[];
    coordinates: [number, number][];
}

export async function fetchRoadsInBox(south: number, west: number, north: number, east: number): Promise<OverpassWay[]> {
    const query = `
        [out:json][timeout:25];
        (
            way["highway"](${south},${west},${north},${east});
        );
        out body;
        >;
        out skel qt;
    `;

    try {
        const response = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            body: query
        });

        if (!response.ok) {
            throw new Error(`Overpass API error: ${response.statusText}`);
        }

        const data = await response.json();

        const nodesMap = new Map<number, [number, number]>();
        const ways: OverpassWay[] = [];

        // First pass: collect all nodes
        for (const element of data.elements) {
            if (element.type === 'node') {
                nodesMap.set(element.id, [element.lat, element.lon]);
            }
        }

        // Second pass: construct ways
        for (const element of data.elements) {
            if (element.type === 'way' && element.tags && element.tags.highway) {
                const coordinates: [number, number][] = [];
                let valid = true;

                for (const nodeId of element.nodes) {
                    const coord = nodesMap.get(nodeId);
                    if (coord) {
                        coordinates.push(coord);
                    } else {
                        valid = false;
                        break;
                    }
                }

                if (valid && coordinates.length > 1) {
                    ways.push({
                        id: element.id,
                        tags: element.tags,
                        nodes: element.nodes,
                        coordinates
                    });
                }
            }
        }

        return ways;
    } catch (error) {
        console.error("Failed to fetch from Overpass API", error);
        return [];
    }
}

// Surface color mapping
export function getSurfaceColor(tags: Record<string, string>): { color: string, weight: number, opacity: number, dashArray?: string } {
    const surface = tags.surface?.toLowerCase() || '';
    const highway = tags.highway?.toLowerCase() || '';

    // Gravel, dirt, unpaved colors -> dotted gray
    if (
        ['gravel', 'fine_gravel', 'compacted', 'pebblestone', 'unpaved', 'dirt', 'earth', 'ground', 'sand'].includes(surface) ||
        highway === 'track'
    ) {
        return { color: '#94a3b8', weight: 4, opacity: 0.8, dashArray: '4, 8' }; // Dotted Gray
    }

    // Paved, unknown, or default -> solid light gray
    return { color: '#cbd5e1', weight: 3, opacity: 0.5 }; // Solid Light Gray
}
