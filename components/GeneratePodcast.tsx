'use-client';

import { GeneratePodcastProps } from '@/types'

import React, { useState } from 'react'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { Loader } from 'lucide-react'

const useGeneratePodcast = ({setAudio, voiceType, setAudioStorageId, voicePrompt}: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePodcaste = async () => {
    setIsGenerating(true);

    setAudio('');

    if(!voicePrompt){
      //todo: show error message in Toast
      return setIsGenerating(false);
    }

    try {
      // const response = await getPodcastAudio({
      //   voice: voiceType,
      //   input: voicePrompt
      // })
    } catch (error) {
      console.log('Error generating Podcast', error);
      //todo: show error message
      setIsGenerating(false);
    }
  }

  return{
    isGenerating: false,
    generatePodcast: () => {}
  }
}

const GeneratePodcast = ({
  setAudioStorageId,
  setAudio,
  voiceType,
  audio,
  voicePrompt,
  setVoicePrompt,
  setAudioDuration,
}: GeneratePodcastProps) => {

  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div>
      <div className='flex flex-col gap-2.5'>
        <Label className='text-16 font-bold text-white-1'>
          AI Prompt to generate Podcast
        </Label>
        <Textarea className='input-class font-light focus-visible:ring-offset-orange-1'
        placeholder='Provide text to generate audio'
        rows={5}
        value={voicePrompt}
        onChange={(e) => setVoicePrompt(e.target.value)}/>
      </div>
      
      <div className='mt-5 w-full max-w-[200px]'>
        <Button type="submit"
        className="text-16  bg-orange-1 py-4 font-extrabold text-white-1"/>
          {isGenerating ? (
            <>
              Generating
              <Loader size={20} className="animate-spin mr-5"/>
            </>
          ): (
            'Generate'
          )}
      </div>
      {audio && (
        <audio className='mt-5'
        controls
        src={audio}
        onLoadedMetadata={(e) => setAudioDuration(e.currentTarget.duration)}
        />
      )}
    </div>
  )
}

export default GeneratePodcast