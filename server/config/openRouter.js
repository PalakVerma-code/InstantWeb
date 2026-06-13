

export const generateResponse=async(prompt)=>{
    

     const response= await fetch('https://openrouter.ai/api/v1/chat/completions', {
       method: 'POST',
       headers: {
            Authorization: `Bearer ${process.env.OPENROUTE_API_KEY}`,
            'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'deepseek/deepseek-chat',
    messages: [
        {
            role: 'system',
            content: `you must return only vaild raw json `
         
        },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.2,
  }),
});
if(!response.ok){
    const errorText=await response.text();
    throw new Error(`OpenRouter API request failed with status ${response.status}: ${errorText}`);
}
const data=await response.json();
   return data.choices[0].message.content; 
}