const CARD_API = "/cards";

export async function getAllCards() {
    const response = await fetch(
      `${CARD_API}`, {
        method: "GET",
      });
    if (response.ok) {
      const body = await response.json();
      console.log(body)
      return body;
    } else {
      throw new Error("Error fetch all cards");
    }
  }

  export async function createCard(newCard) {
    const response = await fetch(CARD_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCard),
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error create card");
    }
  }

  export async function getLearningAllCards() {
    const response = await fetch(
      `${CARD_API}/quizz`
    );
    if (response.ok) {
      const body = await response.json();
      console.log(body)
      return body;
    } else {
      throw new Error("Error fetch card quizz");
    }
  }


export async function learningPatch(updatedCard) {
  const { id, ...restCard } = updatedCard;
  const response = await fetch(`${CARD_API}/${id}/answer`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(restCard),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Error update recipe");
  }
}

