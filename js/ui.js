//reads input, updates DOM
const inputs = document.querySelectorAll(".score");
const totalScore = document.getElementById("total");

inputs.forEach(input => {
    input.addEventListener("input", () => {
        const category = input.dataset.category;
        const value = Number(input.value);

        state[category] = isNaN(value) ? 0 : value;

        updateUI();
    });
})

function updateUI(){
    const total = calculateTotal(state);
    totalScore.textContent = total;
}
