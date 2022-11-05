type SupportedLanguage = 'french' | 'spanish' | 'english';

/**
 * A function that politely greets people.
 * 
 * It takes into account, if possible, the native language of the person,
 * by spelling their first name correctly.
 * 
 * @param name the person name or nickname
 * @param language the language spoken by this person
 * @returns 
 */
export function greetings(name: string, language: SupportedLanguage = 'english') {
  let formattedName = name[0].toUpperCase() + name.substring(1).toLowerCase();
  switch (language) {
    case 'french':
      return `Bonjour ${formattedName} !`;
    case 'spanish':
      return `¡Hola ${formattedName}!`;
    case 'english':
      return `Hello ${formattedName}!`;
    default:
      throw Error(`Sorry, I don't speak "${language}" language.`);
  }
}
