var correct = 0;
var currentQuestion = 0;
var questions = [];

function Question(question, choices, answer) {
	this.question = question;
	this.choices = choices;
	this.answer = answer;
}

questions.push(new Question("Who ?", ["A", "B", "C", "D"], 2));
questions.push(new Question("Where ?", ["A", "B", "C", "D"], 1));
questions.push(new Question("When ?", ["A", "B", "C", "D"], 3));

function createQuestion() {
	var question = questions[currentQuestion];
	$("#question").find("p").text(question.question);
	var ul = $("#choices");
	ul.empty();
	for(var i = 0; i < question.choices.length; i++) {
		var li = $("<li>"+ question.choices[i] +"</li>").addClass("choice").data("answer", i);
		ul.append(li);
	}
}

function isCorrect(answer) {
	var question = questions[currentQuestion];
	return question.answer === answer;
}

function updateCorrect(answer) {
    if(isCorrect(answer)) {
       correct++;
    }
}

function displayResult() {
    $("p").hide();
    $("#choices").empty().hide();
    var result = $("<p>"+ correct +" Correct answer(s)</p>");
    $("#question").append(result);
}

function next() {
    if(currentQuestion >= questions.length) {
        displayResult();   
    } else {
        createQuestion();   
    }
}
        
$("#question").on("click", "li", function(event) {
		updateCorrect(+$(this).data("answer"));
		currentQuestion++;
		next();
});

$(function() {
	$("#start").on("click", function() {
		$(this).remove();
		next();
	});
});