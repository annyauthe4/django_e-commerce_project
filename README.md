An e-commerce project using django rest framework

<h2> CHALLWNGES</h2>
While I was trying to load my product pics from Cloudinary, I configured in the settings as follows
<code> CLOUDINARY_STORAGE = {
	"CLOUD_NAME": os.getenv("CLOUD_NAME"),
	"API_KEY": os.getenv("CLOUD_API_KEY"),
	"API_SECRET_KEY": os.getenv("CLOUD_API_KEY")
       }
</code>
This kept on showing missing API_KEY error. I used the shell to print the various credentials for cloudinary as used above and it showed the values. Which implies the error was not in the settings.
After different back and forth I discovered the reason the credentials were not seen by cloudinary was because Cloudinary only needs the cloudinary url which is to be saved in the .env file and ensured it's loaded in the settings as thus:
<code>BASE_DIR = Path(__file__).resolve().parent.parent</code>
<code> load_dotenv(BASE_DIR / ".env")</code>

The cloudinary url is like this: <code>CLOUDINARY_URL=cloudinary://<your_api_key>:<your_api_secret>@drvmmjo60</code>
