let currentQuestion = 0;
let quizTime = 30;
let result = [];
let questions = [
					{
						question: "What is first letter of alphabets?",
						options:
							[
							"A",
							"B",
							"C",
							"D"
							],
						answer:0,
					},
					{
						question: "What is second letter of alphabets?",
						options:
							[
							"A",
							"B",
							"C",
							"D"
							],
						answer:1,
					},
					{
						question: "What is third letter of alphabets?",
						options:
							[
							"A",
							"B",
							"C",
							"D"
							],
						answer:2,
					},
				];




let questionDiv = document.getElementById('question');
let optionsList = document.getElementById('options');
let content = document.getElementsByTagName('content');


let printQuestion = (index)=>{

	optionsList.innerHTML = "";
	questionDiv.innerHTML = questions[index].question;

	questions[index].options.forEach((o, i) =>{

	let list = document.createElement('li');
	let label = document.createElement('label');
	let input = document.createElement('input');
	input.setAttribute('type', 'radio');
	input.setAttribute('name', 'question');
	input.setAttribute('value', i);

	label.appendChild(input);
	list.appendChild(label);
	label.append(o);
	optionsList.appendChild(list);

})

}

let prevQuestion = ()=>{
	let answer = document.querySelector('input[name="question"]:checked');
	if(currentQuestion >   0)
	{
		currentQuestion--;
		printQuestion(currentQuestion);
	}
}

let nextQuestion = ()=>{
	let answer = document.querySelector('input[name="question"]:checked');
	let correct = false;

	if( answer != null){

		if(questions[currentQuestion].answer == answer.value){
			correct = true;
		}else{
			correct = false;
		}
		result[currentQuestion] = ({question:currentQuestion, answer:answer.value, correct});
			
		if(currentQuestion < questions.length - 1 )
		{
		currentQuestion++;
		printQuestion(currentQuestion);
		}
		else
		{
			content[0].innerHTML = "";
			createFinish();
		}	
	}
}

// Create Next/Previous Button 


let navigation = document.getElementById('navigation');

let createNavigation = ()=>{
	navigation.innerHTML = "";

	let prev = document.createElement('button');
	prev.append('Previous');
	prev.setAttribute('class', 'btn');
	navigation.appendChild(prev);
	prev.addEventListener('click', prevQuestion);

	let next = document.createElement('button');
	next.setAttribute('class', 'btn');
	next.append('Next');
	navigation.appendChild(next);
	next.addEventListener('click', nextQuestion);
}

// Create Start Button 

let startBtn = document.createElement('button');
startBtn.append("Start");
startBtn.setAttribute('class', 'btn');
startBtn.addEventListener('click', ()=>{
	printQuestion(0);
	createNavigation();	
});
navigation.append(`There are total ${questions.length} and you have ${quizTime} minutes of time.`);
navigation.append(document.createElement('br'));
navigation.appendChild(startBtn);


// Create Finish Button 

let createFinish = ()=>{
	var percentage = 0;
	var correctAnswers = 0;
	let finishBtn = document.createElement('button');
	finishBtn.setAttribute('class', 'btn');
	finishBtn.append("Finish");
	content[0].append(finishBtn);
	finishBtn.addEventListener('click', ()=> {
		result.forEach(r =>{
			if(r.correct)
				correctAnswers++;
				percentage = correctAnswers / questions.length * 100; 
		});
	let span = document.createElement('span');
	span.append(`You have ${correctAnswers} / ${questions.length} Correct Answers and your percentage is ${Math.round(percentage)}%`);
	content[0].innerHTML = "";
	content[0].append(span);
	})
}
