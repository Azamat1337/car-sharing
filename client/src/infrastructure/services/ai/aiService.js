export const aiService = {
    getCarInfo: async (carData) => {
        const params = new URLSearchParams({
            key: 'car_aza',
            content: `Автомобиль: ${carData.brand?.name} ${carData.model} ${carData.year}.`,
            query: 'Расскажи интересные факты об этом автомобиле, его характеристики и особенности. Ответь на английском языке. Не больше 10 предложений.'
        });

        const response = await fetch(`https://us-central1-cloud-kz.cloudfunctions.net/messageAI?${params}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Error when receiving information from AI');
        }

        return response.json();
    }
};