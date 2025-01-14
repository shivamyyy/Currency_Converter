const murl="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
// const base_url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const btn1=document.querySelector(".btn7");
const fromCurr=document.querySelector(".fromCurrency");
const toCurr=document.querySelector(".toCurrency");


const select = document.querySelectorAll(".select");

for (let sel of select) {
    for (currCode in countryList) {
        // console.log(currCode,countryList[currCode])
        let nwoption = document.createElement("option");
        nwoption.innerText = currCode;
        nwoption.value = currCode;

        if (sel.name == "from" && currCode == "USD") {
            nwoption.selected = true;
        } else if (sel.name == "to" && currCode == "INR") {
            nwoption.selected = true;
        }

        sel.append(nwoption);
    }

    sel.addEventListener("change", (e) => {
        updateflag(e.target);
    });
}

const updateflag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


btn1.addEventListener("click",async(e)=>{
 e.preventDefault();
//  console.log("hii btn");
 let amount =document.querySelector(".input");
//  console.log(amount.value);
 let amv=amount.value;
 if(amv=="" ||amv<1 ){
    // amv=1;
    amount.value="1";
 }
//  console.log(fromCurr.value, toCurr.value);
 const URL=`${murl}/${fromCurr.value.toLowerCase()}.json`;
 try {
    let response = await fetch(URL);
    // if (!response.ok) {
    //     throw new Error("Error fetching currency data");
    // }
    let data = await response.json();
    // console.log(data);

    let toCurrency = toCurr.value.toLowerCase();
    if (data[fromCurr.value.toLowerCase()] && data[fromCurr.value.toLowerCase()][toCurrency]) {
        let conversionRate = data[fromCurr.value.toLowerCase()][toCurrency];
        let convertedAmount = amv * conversionRate;

        // console.log(`Conversion rate: ${conversionRate}`);
        // console.log(`Converted Amount: ${convertedAmount.toFixed(2)}`);

       
        let a = document.querySelector(".result");
        a.innerHTML = `<b>${amv} ${fromCurr.value} = ${convertedAmount.toFixed(2)} ${toCurr.value}</b>`;
        
    } else {
        console.error("Conversion rate not found for the selected currencies.");
    }
} catch (error) {
    console.error("Error:", error);
    document.querySelector(".result").textContent = 
        "Failed to fetch currency conversion data. Please try again later.";
}

  

});