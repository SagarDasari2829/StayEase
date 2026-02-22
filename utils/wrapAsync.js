module.exports = function (fn) {
  return function (req, res, next) {
    fn(req, res, next).catch(next);
  };
};



// Problem : 
 //  reviewing the repository. i Noticed that many function (especially async route handlers) repeatedly use the same try/catch boilerplate .
//  Example: 
//    try{
//       //logic
//    }.catch(err){
//       next(err)
// }

//    This pattern is duplicated throughtout multiple files it increases :

//    - code repetition
//    - Noise  
//    - chances of inconsistent error handing


//    // Goal for
//    Create a clearInterval, reuseable code Solution that removes repeated