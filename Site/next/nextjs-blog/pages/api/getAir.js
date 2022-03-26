// https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
    fetch('http://localhost:8000/getAir', {
        method: 'POST'
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        res.status(200).json(data);
    })
}
