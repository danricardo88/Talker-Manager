// const NOT_VALIDATED = 400;

// const handleLogin = (_request, response, prox) => {
//   const { email, password } = _request.body;
//    if (email === undefined) {
//     return response.status(NOT_VALIDATED).json({ message: 'O campo "email" é obrigatório' });
//   } 
//   if (email !== 'deferiascomigo@gmail.com') {
//     return response.status(NOT_VALIDATED)
//     .json({ message: 'O "email" deve ter o formato "email@email.com"' });
//   } 
//   if (password === undefined) {
//     return response.status(NOT_VALIDATED).json({ message: 'O campo "password" é obrigatório' });
//   } 
//   if (password.length < 6) {
//     return response.status(NOT_VALIDATED)
//     .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
//   } 
//   prox();
// };

// module.exports = { handleLogin };