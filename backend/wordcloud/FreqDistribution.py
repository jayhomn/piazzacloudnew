from backend.wordcloud.PiazzaExtractorAPI import *  # looks for file location and imports everything with the star
from nltk.tokenize import TweetTokenizer
from nltk.corpus import stopwords
import string
from nltk.probability import FreqDist  # this is for the frequency distribution
import nltk
nltk.download('punkt')
nltk.download('stopwords')

custom_stopwords = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ",", ".", "!", "?", ":", "'", "%", "，", "!", "’",
                    "question", "questions", "！", "along", "using", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
                    "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "15", "get"]


# HOW TO USE: piazzaDictionaryGenerator - takes in email, password, coursecode as parameters
# email/password are the piazza board login for user, routed from UI login inputs
# coursecode is specific to the classes that the user takes, however the coursecode must be an exact match to function
# example coursecodes currently known can be found in data directory
# RETURNS: function returns a dictionary of the top 30 frequency words found in a particular course(descending order)
def piazza_dictionary_generator(email, password, coursecode):

    # get string in using aggregate function
    # use " ".join(x) to return a string concatenated with the elements of an iterable (the string list)
    stringin = " ".join(comment_post_aggregate(email, password, coursecode))

    # define stop/filler words and punctuation
    stop = stopwords.words('english') + list(string.punctuation) + custom_stopwords
    cleaner = TweetTokenizer()

    # string stripped of punctuation and filler words
    cleanString = [i for i in cleaner.tokenize(stringin.lower()) if (i not in stop)]

    # iterate through the string array, and get rid of non ascii characters; reduced to ''
    printable = set(string.printable)
    for index in range(len(cleanString)):
        cleanString[index] = ''.join(filter(lambda x: x in printable, cleanString[index]))

    # frequency distribution of cleaned string
    fdist = FreqDist(cleanString)

    # get rid of empty key due to non-ascii removal from previous step
    del fdist['']

    # top 30 distribution
    fdist_30 = fdist.most_common(30)

    # convert to dictionary and return dictionary
    freq_dictionary = {}
    for index in range(len(fdist_30)):
        freq_dictionary.update({fdist_30[index][0]: fdist_30[index][1]})

    return freq_dictionary

# print(piazza_dictionary_generator("samuel.ip@alumni.ubc.ca", "59170864aS@", "MATH 103.ALL"))

