import smtplib
from email.mime.text import MIMEText
import datetime

def generate_hyeonho_point_text(us_high, us_low, kr_high, kr_low):
    hyeonho_us = us_high / (us_high + us_low) * 100
    hyeonho_kr = kr_high / (kr_high + kr_low) * 100

    text = f"오늘의 US 시장 정보입니다.\n" \
           f"신고가 {us_high}개, 신저가 {us_low}개로 오늘 미국 현호 포인트는 {round(hyeonho_us, 3)}%입니다." \
           f"\n\n오늘의 KR 시장 정보입니다.\n" \
           f"신고가 {kr_high}개, 신저가 {kr_low}개로 오늘 한국 현호 포인트는 {round(hyeonho_kr, 3)}%입니다."
    return text

def send(text, send_email, recv_email, password):

    msg = MIMEText(text)  # MIMEText(text , _charset = "utf8")

    smtpName = "smtp.gmail.com"
    smtpPort = 587

    today = datetime.datetime.now()

    msg['Subject'] = f'💸 {today.strftime("%Y-%m-%d")} 주식 정보 💸'
    msg['From'] = send_email
    msg['To'] = ", ".join(recv_email)

    print(msg.as_string())

    s = smtplib.SMTP(smtpName, smtpPort)  # 메일 서버 연결
    s.starttls()  # TLS 보안 처리
    s.login(send_email, password)  # 로그인
    s.sendmail(send_email, recv_email, msg.as_string())  # 메일 전송, 문자열로 변환해야 합니다.
    s.close()  # smtp 서버 연결을 종료합니다.

    print("success")
