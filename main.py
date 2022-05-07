from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from pprint import pprint

options = webdriver.ChromeOptions()
options.add_argument('--headless')               # headless
options.add_argument('--no-sandbox')
options.add_argument('--disable-dev-shm-usage')
options.add_argument('--disable-gpu')
driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
driver.implicitly_wait(3)

# 미국 신고가 확인
driver.get('https://kr.investing.com/equities/52-week-high?country=usa')
search_us_high = driver.find_elements(by=By.XPATH, value='//*[@id="stockPageInnerContent"]/table/tbody/tr')
us_high = len(search_us_high)
pprint(us_high)

# 미국 신저가 확인
driver.get('https://kr.investing.com/equities/52-week-low?country=usa')
search_us_low = driver.find_elements(by=By.XPATH, value='//*[@id="stockPageInnerContent"]/table/tbody/tr/td/a')
us_low = len(search_us_low)
pprint(us_low)

hyeonho_us = us_high / (us_high + us_low) * 100
pprint(hyeonho_us)

# 한국 신고가 확인
driver.get('https://kr.investing.com/equities/52-week-high?country=south-korea')
search_kr_high = driver.find_elements(by=By.XPATH, value='//*[@id="stockPageInnerContent"]/table/tbody/tr')
kr_high = len(search_kr_high)
pprint(kr_high)

# 한국 신저가 확인
driver.get('https://kr.investing.com/equities/52-week-low?country=south-korea')
search_kr_low = driver.find_elements(by=By.XPATH, value='//*[@id="stockPageInnerContent"]/table/tbody/tr/td/a')
kr_low = len(search_kr_low)
pprint(kr_low)

hyeonho_kr = kr_high / (kr_high + kr_low) * 100
pprint(hyeonho_kr)

# 메일 보내기
import smtplib
from email.mime.text import MIMEText
from dotenv import load_dotenv
import os
import datetime

# load .env
load_dotenv()

text = f"오늘의 US 시장 정보입니다.\n" \
       f"신고가 {us_high}개, 신저가 {us_low}개로 오늘 미국 현호 포인트는 {round(hyeonho_us, 3)}%입니다." \
       f"\n\n오늘의 KR 시장 정보입니다.\n" \
       f"신고가 {kr_high}개, 신저가 {kr_low}개로 오늘 한국 현호 포인트는 {round(hyeonho_kr, 3)}%입니다."
msg = MIMEText(text)  # MIMEText(text , _charset = "utf8")

sendEmail = os.environ.get('SEND_EMAIL')
recvEmail = os.environ.get('RECV_EMAIL')
password = os.environ.get('PASSWORD')

smtpName = os.environ.get('SMTP_NAME')
smtpPort = os.environ.get('SMTP_PORT')

today = datetime.datetime.now()

msg['Subject'] = f'💸 {today.strftime("%Y-%m-%d")} 주식 정보 💸'
msg['From'] = sendEmail
msg['To'] = recvEmail
print(msg.as_string())

s = smtplib.SMTP(smtpName, smtpPort)  # 메일 서버 연결
s.starttls()  # TLS 보안 처리
s.login(sendEmail, password)  # 로그인
s.sendmail(sendEmail, recvEmail, msg.as_string())  # 메일 전송, 문자열로 변환해야 합니다.
s.close()  # smtp 서버 연결을 종료합니다.
