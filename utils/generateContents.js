const countrys = {
  usa: "미국",
  "south-korea": "한국",
};

module.exports.generateTodayPointContents = ({ country, point, high, low }) => {
  return `오늘의 ${countrys[country]} 시장 정보입니다.\n신고가 ${high}개, 신저가 ${low}개로 오늘 ${countrys[country]} 바닥 지수는 ${point}%입니다.\n`;
};

module.exports.generateCurrentPointContents = ({
  country,
  point,
  high,
  low,
}) => {
  return `오늘의 ${countrys[country]} 시장 정보입니다.\n신고가 ${high}개, 신저가 ${low}개로 현제 ${countrys[country]} 바닥 지수는 ${point}%입니다.\n`;
};
