export const retry = async (func, retries= 3, delay= 1000) => {
   try {
        return await func();      
   } catch (error) {
       if(retries <= 0) throw error;
       await new Promise(resolve => setTimeout(resolve, delay));
       return retry(func, retries - 1, delay);
   }
};
