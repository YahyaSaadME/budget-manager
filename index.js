const allLogs = async () => {
  try {
    const data = JSON.parse(localStorage.getItem("logs"));
    const Amount = JSON.parse(localStorage.getItem("myWallet"));

    if (Amount == null) {
      location.replace("./add.html");
    } else {
      document.getElementById("gpay").innerHTML = Amount.gpay;
      document.getElementById("cash").innerHTML = Amount.cash;

      document.getElementById("spent").innerHTML = Amount.spent;
      document.getElementById("savings").innerHTML = Amount.gpay + Amount.cash;
    }
    if (data != null) {
      document.getElementById("no").style.display = "none";
      document.getElementById("logs").innerHTML = "";

      function splitArrayByDate(dataArray) {
        return dataArray.reduce((result, currentObj) => {
          console.log(currentObj.when);
          let date = new Date(currentObj.when);
          date = new Date(
            `${date.getMonth() + 1} ${date.getDate()} ${date.getFullYear()}`
          );
          if (!result[date]) {
            result[date] = [];
          }
          result[date].push({
            why: currentObj.why,
            type: currentObj.type,
            amount: currentObj.amount,
            when: currentObj.when,
            received:currentObj.received
          });
          return result;
        }, {});
      }

      const splitData = Object.entries(splitArrayByDate(data)).map(
        ([date, data]) => ({ date, data })
      );

      splitData.map((data, i) => {
        const date = new Date(data.date);
        const currentDate = new Date();
        if (date.toDateString() == currentDate.toDateString()) {
          document.getElementById(
            "logs"
          ).innerHTML += `<div class='center-date-div'><h2 class='center-date'>Today</h2></div>`;
        } else {
          document.getElementById(
            "logs"
          ).innerHTML += `<div class='center-date-div'><h2 class='center-date'>${date.getDate()} | ${
            date.getMonth() + 1
          } | ${date.getFullYear()} </h2></div>`;
        }
        data.data.map((e, i) => {
          const when = new Date(e.when);
          console.log(e);
          document.getElementById("logs").innerHTML += `
            <div class="log">
          <div>
            <h2 class="why">
              ${e.why}
            </h2>
            <div style="display: flex; align-items: center">
              <h2 class="type">${e.type}</h2>
              <h2 class="time">${when.getHours()}:${when.getMinutes()}:${when.getSeconds()}</h2>
            </div>
          </div>
          <h2 class="amount">${e.received?"+ ":" "} ₹${e.amount} /-</h2>
        </div>
            `;
        });
      });
    } else {
      document.getElementById("no").style.display = "flex";
    }
  } catch (error) {
    console.log(error);
  }
};
allLogs();
const reset = () => {
  localStorage.removeItem("logs");
  localStorage.removeItem("myWallet");
  location.replace("./add.html");
};

const addSpentLogs = async () => {
  const why = document.getElementById("why").value;
  const Amount = document.getElementById("input-amount").value;
  const type = document.getElementById("type").value;
  const data = JSON.parse(localStorage.getItem("myWallet"));

  if (Amount == 0 || Amount == "" || why == "") {
    document.getElementById("bad-alert").style.display = "flex";
  } else {
    if (type == "Cash" && Number(Amount) > data.cash) {
      document.getElementById("Amount-exceed-alert").style.display = "flex";
    } else if (type == "Gpay" && Number(Amount) > data.gpay) {
      document.getElementById("Amount-exceed-alert").style.display = "flex";
    } else {
      try {
        document.getElementById("good-alert").style.display = "flex";
        let prev = JSON.parse(localStorage.getItem("logs"));
        let prevAmount = JSON.parse(localStorage.getItem("myWallet"));
        if (!prev) {
          prev = [];
        }
        if (prevAmount == null) {
          localStorage.setItem(
            "myWallet",
            JSON.stringify({ cash: 0, gpay: 0, spent: 0 })
          );
          prevAmount = JSON.parse(localStorage.getItem("myWallet"));
        }
        const add = localStorage.setItem(
          "logs",
          JSON.stringify([
            {
              why: why,
              amount: Amount,
              type: type == "Cash" ? "Cash" : "Gpay",
              when: new Date(),
              received:false
            },
            ...prev,
          ])
        );
        if (type == "Cash") {
          localStorage.setItem(
            "myWallet",
            JSON.stringify({
              cash: prevAmount.cash - Number(Amount),
              gpay: prevAmount.gpay,
              spent: Number(prevAmount.spent) + Number(Amount),
              received:false
            })
          );
        } else {
          localStorage.setItem(
            "myWallet",
            JSON.stringify({
              gpay: prevAmount.gpay - Number(Amount),
              cash: prevAmount.cash,
              spent: Number(prevAmount.spent) + Number(Amount),
              received:false
            })
          );
        }
        allLogs();
      } catch (error) {
        document.getElementById("good-alert").style.display = "none";
        document.getElementById("bad-alert").style.display = "flex";
        console.log(error);
      }
    }
  }
};

const addReceivedLogs = async () => {
  const why = document.getElementById("why").value;
  const Amount = document.getElementById("input-amount").value;
  const type = document.getElementById("type").value;
  const data = JSON.parse(localStorage.getItem("myWallet"));

  if (Amount == 0 || Amount == "" || why == "") {
    document.getElementById("bad-alert").style.display = "flex";
  } else {
    if (type == "Cash" && Number(Amount) > data.cash) {
      document.getElementById("Amount-exceed-alert").style.display = "flex";
    } else if (type == "Gpay" && Number(Amount) > data.gpay) {
      document.getElementById("Amount-exceed-alert").style.display = "flex";
    } else {
      try {
        document.getElementById("good-alert").style.display = "flex";
        let prev = JSON.parse(localStorage.getItem("logs"));
        let prevAmount = JSON.parse(localStorage.getItem("myWallet"));
        if (!prev) {
          prev = [];
        }
        if (prevAmount == null) {
          localStorage.setItem(
            "myWallet",
            JSON.stringify({ cash: 0, gpay: 0, spent: 0 })
          );
          prevAmount = JSON.parse(localStorage.getItem("myWallet"));
        }
        console.log(prev.when);
        const add = localStorage.setItem(
          "logs",
          JSON.stringify([
            {
              why: why,
              amount: Amount,
              type: type == "Cash" ? "Cash" : "Gpay",
              when: new Date(),
              received:true
            },
            ...prev,
          ])
        );
        if (type == "Cash") {
          localStorage.setItem(
            "myWallet",
            JSON.stringify({
              cash: prevAmount.cash + Number(Amount),
              gpay: prevAmount.gpay,
              spent: Number(prevAmount.spent),
              received:true
            })
          );
        } else {
          localStorage.setItem(
            "myWallet",
            JSON.stringify({
              gpay: prevAmount.gpay + Number(Amount),
              cash: prevAmount.cash,
              spent: Number(prevAmount.spent),
              received:true
            })
          );
        }
        allLogs();
      } catch (error) {
        document.getElementById("good-alert").style.display = "none";
        document.getElementById("bad-alert").style.display = "flex";
        console.log(error);
      }
    }
  }
};

const alertClose = () => {
  document.getElementById("good-alert").style.display = "none";
  document.getElementById("bad-alert").style.display = "none";
  document.getElementById("Amount-exceed-alert").style.display = "none";
};

document.getElementById("why").addEventListener("click", (e) => {
  document.getElementById("reason-shortcut").style.display = "grid";
});
document.getElementById("input-amount").addEventListener("click", (e) => {
  document.getElementById("amount-shortcut").style.display = "grid";
});
window.addEventListener("click", (e) => {
  if (e.target.id != "why") {
    document.getElementById("reason-shortcut").style.display = "none";
  } 
  if (e.target.id != "input-amount") {
    document.getElementById("amount-shortcut").style.display = "none";
  }
});

const WSC =(e)=>{
  document.getElementById("why").value += e
}
const ASC =(e)=>{
  let val = document.getElementById("input-amount").value
  document.getElementById("input-amount").value = Number(val) + e
}