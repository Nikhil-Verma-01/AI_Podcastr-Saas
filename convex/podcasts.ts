import { ConvexError, v } from "convex/values";
import { mutation } from "./_generated/server";

export const getUrl = mutation({
    args:{
        storageId: v.id('_storage'),

    },
    handler: async (ctx, args) => {
        return await ctx.storage.getUrl(args.storageId)
    }
})

export const createPodcast = mutation({
    args: {
        podcastTitle: v.string(),
        podcastDescription: v.string(),
        audioUrl: v.string(),
        imageUrl: v.string(),
        imagePrompt: v.string(),
        voiceType: v.string(),
        voicePrompt: v.string(),
        views: v.number(),
        audioDuration: v.number(),
        audioStorageId: v.string(),
        imageStorageId: v.string(),
    },
    handler: async(ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new ConvexError('Not authenticated')
        }

        const user = await ctx.db
            .query('users')
            .filter((q) => q.eq(q.field('email'), identity.email))
            .collect();
        if(user.length == 0){
            throw new ConvexError('User not found')
        }

        const podcast = await ctx.db.insert('podcasts', {
            ...args,
            user: user[0]._id,
            author: user[0].name,
            authorId: user[0].clerkId,
            authorImageUrl: user[0].imageUrl,
        })
        return podcast
    }
})