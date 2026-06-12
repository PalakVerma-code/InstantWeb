

export const generateResponse=async(req,res)=>{
    

     const response= await fetch('https://openrouter.ai/api/v1/chat/completions', {
       method: 'POST',
       headers: {
            Authorization: 'Bearer ' + process.env.OPENROUTE_API_KEY,
            'HTTP-Referer': '<YOUR_SITE_URL>',
            'X-Title': '<YOUR_SITE_NAME>',
            'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'deepseek/deepseek-chat',
    messages: [
        {
            role: 'system',
            content: `You are a helpful assistant that generates code for websites based on user prompts.`
         
        },
      {
        role: 'user',
        content: prompt,
      },
    ],
  }),
});
if(!response.ok){
    return res.status(500).json({ success:false, message:"Failed to generate code"});
}
const data=await responce.json();
   return data; 
}