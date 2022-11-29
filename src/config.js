let enviroment = {}

enviroment.staging = {
    'baseUrl':"http://localhost:3000",
    'baseUrlBack':"https://postguys-env.eba-xpyhpaw7.us-east-1.elasticbeanstalk.com"
}

enviroment.production = {
    'baseUrl':"http://main.d2vq9ezjhsp9ls.amplifyapp.com",
    'baseUrlBack':"https://postguys-env.eba-xpyhpaw7.us-east-1.elasticbeanstalk.com"
}

export default enviroment.production