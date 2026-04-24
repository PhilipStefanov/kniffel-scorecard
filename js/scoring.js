console.log("script loaded");
const inputs = document.querySelectorAll(".score");
const totalScore = document.getElementById("total");

function updateTotal(){
    let sum = 0;

    inputs.forEach(input => {
        sum += Number(input.value);
    });

    totalScore.textContent = sum;
}

inputs.forEach(input => {
    input.addEventListener("input", updateTotal);
    //input.addEventListener("change", updateTotal);
});