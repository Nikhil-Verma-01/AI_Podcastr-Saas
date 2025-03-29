"use client";

import PodcastCard from '@/components/PodcastCard'
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import React from 'react'



const Home = () => {
  const trendingPodcast = useQuery(api.podcasts.getTrendingPodcasts);
  
  return (
    <div className='mt-6 flex flex-col'>
        <section className='flex flex-col gap-5'>
            <h1 className='text-20 font-bold text-white-1'>Trending Podcast</h1>

            <div className='podcast_grid'>
              {trendingPodcast?.map(({_id, podcastTitle, podcastDescription, imageUrl}) => (
                <PodcastCard 
                key={_id} 
                title={podcastTitle} 
                imgUrl={imageUrl} 
                description={podcastDescription} 
                podcastId={_id}/>
              ))}
            </div>

                        
        </section>
    </div>
  )
}

export default Home