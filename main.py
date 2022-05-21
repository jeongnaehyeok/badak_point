from invest_data import week_52
import mail_service
from dotenv import load_dotenv
import os

# load .env
load_dotenv()

send_email = os.environ.get('SEND_EMAIL')
recv_email = os.environ.get('RECV_EMAIL').split(',')
password = os.environ.get('PASSWORD')

us_low = week_52.get_low_count('usa')
us_high = week_52.get_high_count('usa')

kr_low = week_52.get_low_count('south-korea')
kr_high = week_52.get_high_count('south-korea')

text = mail_service.generate_hyeonho_point_text(us_high, us_low, kr_high, kr_low)
mail_service.send(text, send_email, recv_email, password)
