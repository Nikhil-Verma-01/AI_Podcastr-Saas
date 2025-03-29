'use client'

import EmptyState from '@/components/EmptyState'
import LoaderSpinner from '@/components/LoaderSpinner'
import PodcastCard from '@/components/PodcastCard'
import PodcastDetialPlayer from '@/components/PodcastDetialPlayer'
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import Image from 'next/image'
import React from 'react'

const PodcastDetails = ({params: {podcastId}}: {params: { podcastId: Id<'podcasts'>}}) => {

  const podcast = useQuery(api.podcasts.getPodcastById, {podcastId});
  const similiarPodcasts = useQuery(api.podcasts.getPodcastById, {podcastId});

  if(!similiarPodcasts || !podcast) return <LoaderSpinner/>
  return (
    <section className='flex flex-col w-full'>
      <header className='mt-9 flex items-center justify-center'>
        <h1 className='text-20 font-bold text-white-1'>
          Currently Playing
        </h1>
        <figure className='flex gap-3'>
          <Image
            src="/icons/headphone.svg"
            width={24} height={24}
            alt='headphone'
          />
          <h2 className='text-16 font-bold text-white-1'>
            {podcast?.views}
          </h2>
        </figure>
      </header>

      <PodcastDetialPlayer/>

      <p className='text-white-2 text-16 pb-8 pt-[45px]
      font-medium max-md:text-center'> {podcast?.podcastDescriptions}</p>

      <div className='flex flex-col gap-8'>
        <div className='flex flex-col gap-4'>
          <h1 className='text-18 font-cold text-white-1'>
            Transciption
          </h1>
          <p className='text-16 font-medium text-white-2'>{podcast?.voicePrompt}</p>
        </div>

        <div className='flex flex-col gap-4'>
          <h1 className='text-18 font-cold text-white-1'>
            Thumbnail Prompt
          </h1>
          <p className='text-16 font-medium text-white-2'>{podcast?.imagePrompt}</p>
        </div>
      </div>

      <section>
        <h1 className='text-20 font-bold text-white-1'>
          Similiar Podcast
        </h1>
        {similiarPodcasts && similiarPodcasts.length > 0 
        ? (
          <div>
            {similiarPodcasts?.map(({_id, podcastTitle, podcastDescription, imageUrl}) => (
                <PodcastCard 
                key={_id} 
                title={podcastTitle} 
                imgUrl={imageUrl} 
                description={podcastDescription} 
                podcastId={_id}/>
              ))}
          </div>
        ): (
          <>
            <EmptyState
            title="No similiar podcast found"
            buttonLink="/discover"
            buttonText="Discover more podcasts"/>
          </>
        )}
      </section>
    </section>
  )
}

export default PodcastDetails