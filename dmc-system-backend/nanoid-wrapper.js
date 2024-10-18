// nanoid-wrapper.js
async function getNanoid() {
    const { nanoid } = await import('nanoid');
    return nanoid();
  }
  
module.exports = {
    getNanoid
  };
  