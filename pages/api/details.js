var axios = require('axios');

const getPoapDetails = async (req, res) => {
   try {
      // Prepare the `body` (contract, network, id)
      const data = JSON.stringify({
         // ...
      });

      // Prepare the `request` object (url method, headers, ...)
      var config = {
         // ...
      };

      // Perform the API request

      
      // Return the response object
      res.status(200).json(/* response object */);
   } catch (e) {
      // Return the error
      res.status(e.response.status).json({e});
   }
};

export default getPoapDetails;


