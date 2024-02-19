import { createCard } from '../src/apis/card';

describe('createCard', () => {
  it('should create a new card', async () => {

    const mockResponse = { id: 1, question: 'What is React?', answer: 'A JavaScript library', tag: 'Programming' };
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    const newCard = { question: 'What is React?', answer: 'A JavaScript library', tag: 'Programming' };

    const createdCard = await createCard(newCard);

    expect(fetch).toHaveBeenCalledWith('/cards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCard),
    });

    expect(createdCard).toEqual(mockResponse);
  });

  it('should throw an error if request fails', async () => {
  
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
    });

    const newCard = { question: 'What is React?', answer: 'A JavaScript library', tag: 'Programming' };

    await expect(createCard(newCard)).rejects.toThrow('Error create card');
  });
});

