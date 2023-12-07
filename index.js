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

    if (data != null || data.length != 0) {
      document.getElementById("no").style.display = "none";
      document.getElementById("logs").innerHTML = "";
      data.map((e, i) => {
        const date = new Date(e.when);
        document.getElementById("logs").innerHTML += `
          <div class="log">
        <div>
          <h2 class="why">
            ${e.why}
          </h2>
          <div style="display: flex; align-items: center">
            <h2 class="type">${e.type}</h2>
            <h2 class="time">${date.getDate()} | ${date.getMonth()} | ${date.getFullYear()} | ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}</h2>
          </div>
        </div>
        <h2 class="amount">${e.amount}</h2>
      </div>
          `;
      });
    } else {
      document.getElementById("no").style.display = "flex";
      document.getElementById("no").style.display = "none";
    }
  } catch (error) {
    console.log(error);
  }
};
allLogs();
const reset = () => {
  localStorage.removeItem('logs')
  localStorage.removeItem('myWallet')
  location.replace('./add.html')
};
const addLogs = async () => {
  const why = document.getElementById("why").value;
  const Gpay = document.getElementById("Gpay").value;
  const Cash = document.getElementById("Cash").value;
  document.getElementById("good-alert").style.display = "none";
  document.getElementById("bad-alert").style.display = "none";
  try {
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
          amount: Cash !== "" ? Cash : Gpay,
          type: Cash !== "" ? "Cash" : "Gpay",
          when: new Date(),
        },
        ...prev,
      ])
    );
    localStorage.setItem(
      "myWallet",
      JSON.stringify({
        cash: prevAmount.cash - Number(Cash),
        gpay: prevAmount.gpay - Number(Gpay),
        spent: Number(prevAmount.spent) + Number(Gpay) + Number(Cash),
      })
    );
    allLogs();
  } catch (error) {
    document.getElementById("bad-alert").style.display = "flex";
    console.log(error);
  }
};

const alertClose = () => {
  document.getElementById("good-alert").style.display = "none";
  document.getElementById("bad-alert").style.display = "none";
};
