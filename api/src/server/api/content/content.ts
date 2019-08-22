import { verify } from 'jsonwebtoken';

export const contentText = `It has been said that silence is strength; in a quite different sense it is a terrible strength in the hands of those who are loved. 
It increases the anxiety of the one who waits. Nothing so tempts us to approach another person as what is keeping us apart; 
and what barrier is so insurmountable as silence? It has been said also that silence is torture, 
capable of goading to madness the man who is condemned to it in a prison cell. 

But what an even greater torture than that of having to keep silence it is to have to endure the silence of the person one loves! 
Robert said to himself: 'What can she be doing, to keep so silent as this? Obviously she's being unfaithful to me with others.
' He also said to himself: 'What have I done that she should be so silent? Perhaps she hates me, and will go on hating me for ever.' 
And he reproached himself. Thus silence indeed drove him mad with jealousy and remorse. Besides, more cruel than the intangible enclosure, 
true, but an impenetrable one, this interposed slice of empty atmosphere through which nevertheless the visual rays of the abandoned lover cannot pass.

Is there a more terrible form of illumination than that of silence, which shows us not one absent love but a thousand, and shows us each of them in the 
act of indulging in some new betrayal? Sometimes, in a sudden slackening of tension, Robert would imagine that this silence was about to cease, 
that the letter was on its way. He saw it, it had arrived, he started at every sound, his thirst was already quenched, he murmured: 
'The letter! The letter!' After this glimpse of a phantom oasis of tenderness, he found himself once more toiling across the real desert of a silence 
without end."`

/**
 * gets read more content of a passage from proust
 * @param ctx 
 */
export const getContent = async ctx => {

    ctx.status = 200;
    
    //if token is valid, then return entire content
    //TODO: move it out of content.ts so it can be used for other endpoints
    try{
        ctx.state.token = verify(ctx.request.token, "wem39fka");
        ctx.body = { text: contentText} ;
    }catch (err) {
        //missing/invalid token = return partial content
        ctx.body = {text: `${contentText.slice(0, contentText.length / 2)}. .`};
    }
}