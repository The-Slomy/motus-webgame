## Game summary

A word guess game, where the user has 6 tries to guess the hidden word. The first letter is fixed and shown from the begining to the user.
The word is a random french word of minimum 5 letters.

## Stories

# Random word

A random french word of minimum 5 letters is generated and hidden to the user (only 1st letter shown) in the game grid.

# Game grid

A grid of x letters (columns) and 6 rows (6 tries maximum) is displayed. For each row, the first letter of the word is displayed and untouchable by the user.

x = word to guess length

# Adding each letter the user is typing

Every time a user is typing a LETTER, it is displayed in the current grid row. If the user backspaces it deletes the last letter of the word. The user can no longer type new letters when he reaches the end of the current row.

# Guessing the word

When the user presses 'enter' and if he reached the end of the current row they guess the word typed. If it is not an existing french word, an error message is displayed and nothing happens. If it is an existing french word, we evaluate the guessed word in comparison to the random word to find :

-If a letter corresponds to one of the letters in the word to be guessed, the background of the tile of this letter becomes yellow, indicating to the user that this letter exists in the word but is missplaced.
-If a letter corresponds to one of the letters in the word to be guessed AND is in the same position as the letter of the word to be guessed, it becomes blue?, indicating to the user that this letter exists in the word to be found and is in the right place.
-Otherwise nothing happens.

After the guess, if it's a perfect match a success message appears and GG ! However if it is not a perfect match, the next letter typed by the user will be in the following grid row (the previous row will not be changed after that).

# Digital keyboard

A digital keyboard is displayed below the word grid (letters + backspace + enter). Typing on the digital keyboard is the same as typing in the regular keyboard. After each user guess, the letters that are not in the word to guess will have a 'disabled state' display
