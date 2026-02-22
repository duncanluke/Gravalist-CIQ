import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        if (!supabase) {
            return NextResponse.json({ error: 'Database client not available' }, { status: 500 });
        }

        const body = await request.json();
        const { userId, rideId, totalRocks, avgRating, checkpoints, bikeType } = body;

        console.log(`Syncing ride ${rideId} for user ${userId}`);

        // 1. Upsert the ride summary in 'maps' schema
        const { error: rideError } = await supabase
            .schema('maps')
            .from('rides')
            .upsert({
                ride_id: rideId,
                user_id: userId,
                total_rocks: totalRocks,
                avg_rating: avgRating,
                bike_type: bikeType
            }, { onConflict: 'ride_id' });

        if (rideError) {
            console.error('Ride sync error:', rideError);
            return NextResponse.json({ error: rideError.message }, { status: 500 });
        }

        // 2. Insert checkpoints if they exist
        if (checkpoints && checkpoints.length > 0) {
            // Garmin sends checkpoints as [lat, lon, rating, speed, grad]
            const checkpointData = checkpoints.map((c: any) => ({
                ride_id: rideId,
                lat: c[0],
                lon: c[1],
                location: `POINT(${c[1]} ${c[0]})`, // PostGIS format Longitude Latitude
                rating: c[2],
                speed: c[3],
                gradient: c[4]
            }));

            const { error: cpError } = await supabase
                .schema('maps')
                .from('checkpoints')
                .insert(checkpointData);

            if (cpError) {
                console.error('Checkpoints sync error:', cpError);
            }
        }

        return NextResponse.json({ status: 'success', message: 'Ride synchronized' });

    } catch (error: any) {
        console.error('API Sync Error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
