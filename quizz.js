var correct = 0;
var currentQuestion = 0;
var questions = [];

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
    } else {
        $("li:nth-child("+(answer+1)+")").addClass("wrong");   
    }
    $("li:nth-child("+(questions[currentQuestion].answer+1)+")").addClass("correct");
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
    $("#question").on("click", "li", choiceClicked);
}

function choiceClicked() {
    $("#question").off("click", "li", choiceClicked);
    updateCorrect(+$(this).data("answer"));
    currentQuestion++;
    setTimeout(next, 500);
}

$(function() {
	$("#start").on("click", function() {
        $.getJSON("questions/questions.json", function(data) {
            questions = data;
            next();
        });
        $(this).remove();
	});
});