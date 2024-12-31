const inputs = document.querySelectorAll('#evaIndex');
inputs.forEach((input) => {
  input.click();
});

const arr = [
  '爱国守法、敬业爱生、教书育人、为人师表、以德施教',
  '坚持正确的政治方向和价值引领，杜绝损害国家利益和不利于学生健康成长的错误言行',
  '教学态度	 认真投入、备课充分、内容娴熟',
  '教学设计由浅入深、循序渐进',
  '提供在线学习资源及课后阅读材料充实教学信息量',
  '教学内容	 课程内容与教学目标一致',
  '教学方法	 条理清晰、讲解生动、重点突出，深入浅出',
  '注重实践能力与创新意识、科学思想与思维、表达能力培养',
  '理论与应用相结合，学以致用',
  '善于启发、引导学生研究性学习，注重师生互动',
  '学习获得感	 对科学思想与研究性思维、表达、创新意识的形成有帮助',
];

const textarea = document.querySelector('#evaText');
textarea.value = arr[0];
