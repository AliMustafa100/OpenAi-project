import openai from '../config/openaiConfig.js';

const generateMeta = async (req, res) => {
    const { title } = req.body;

    const description = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages:[
            {
                'role':'user',
                'content':`Come up with a description for a Youtube Video called ${title}`,
            }
        ]
       
    });
    //  console.log(description.choices[0]);

    const tags = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages:[
            {
                'role':'user',
                'content':`Come up with 10 keyword for a Youtube Video called ${title}`,
            }
        ]
        
    });

    // console.log(tags.choices[0]);
    res.status(200).json({
        description: description.choices[0],
        tags: tags.choices[0]
    });
};

const generateImg = async (req, res) => {
    const { prompt } = req.body; 

    const image = await openai.images.generate({
        model: "dall-e-3", 
        prompt: prompt,
        n: 1,
        size: "1024x1024", // Adjusted to a supported size
    });

    res.json({
        url: image.data[0].url,
    });
};

export { generateMeta, generateImg };

