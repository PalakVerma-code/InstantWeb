
const extractJson=async(text)=>{
    if(!text){
        return null;
    }
    const cleanedText=text.replace(/'''json/gi,"").replace(/'''/g,"").trim();

    const openBracketIndex=cleanedText.indexOf("{");
    const closeBracketIndex=cleanedText.lastIndexOf("}");
    if(openBracketIndex===-1 || closeBracketIndex===-1 || closeBracketIndex<=openBracketIndex){
        return null;
    }
    const jsonText=cleanedText.slice(openBracketIndex, closeBracketIndex + 1);
    try{
        return JSON.parse(jsonText);
    }catch(err){
        return null;
    }
}
export default extractJson;