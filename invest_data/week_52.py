# from venv.constant.header import headers
from invest_mail_service.constant.header import headers
import requests
from lxml.html import fromstring


def get_high_count(country):
    url = f"https://www.investing.com/equities/52-week-high?country={country}"

    req = requests.get(url, headers=headers())

    if req.status_code != 200:
        raise ConnectionError(
            "ERR#0015: error " + str(req.status_code) + ", try again later."
        )
    root_ = fromstring(req.text)
    path_ = root_.xpath('//*[@id="stockPageInnerContent"]/table/tbody/tr/td/a')
    result = len(path_)
    return result


def get_low_count(country):
    url = f"https://www.investing.com/equities/52-week-low?country={country}"

    req = requests.get(url, headers=headers())

    if req.status_code != 200:
        raise ConnectionError(
            "ERR#0015: error " + str(req.status_code) + ", try again later."
        )
    root_ = fromstring(req.text)
    path_ = root_.xpath('//*[@id="stockPageInnerContent"]/table/tbody/tr/td/a')
    result = len(path_)
    return result
