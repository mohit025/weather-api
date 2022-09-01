const router=require('express').Router();
const fetch=require("fetch");
require('dotenv').config()
router.get('/',(req,res)=>{
    res.render('index',{
        city:null,
        des:null,
        icon:null,
        temp:null
    });
});
router.post('/', async (req,res)=>{
    // console.log(req.body);
    const city=req.body.city;
    const cli_api=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}`;
    try{

        await fetch(cli_api)
        .then(res => res.json())
        .then(data => {
          if (data.message === 'city not found') {
            res.render('index', {
              city: data.message,
              des: null,
              icon: null,
              temp: null
            })
          } else {
            const city = data.name;
            const des = data.weather[0].description;
            // const icon = data.weather[0].icon;
            const temp = data.main.temp;
  
            res.render('index', {
              city:city, des:des,
               icon:icon, 
               temp:temp
            });
          }
        });
  
    } catch (err) {
      res.render('index', {
        city: null,
        des: null,
        icon: null,
        temp: null
      })
    }
})





module.exports=router;