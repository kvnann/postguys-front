let enviroment = {}

enviroment.staging = {
    'baseUrl':"http://localhost:3000",
    'baseUrlBack':"http://postguys-env.eba-xpyhpaw7.us-east-1.elasticbeanstalk.com"
}

enviroment.production = {
    'baseUrl':"https://postguys-demo.herokuapp.com",
    'baseUrlBack':"http://postguys-env.eba-xpyhpaw7.us-east-1.elasticbeanstalk.com"
}

export default enviroment.staging