import re 
import tweepy 
from tweepy import OAuthHandler 
from textblob import TextBlob 
import pandas as pd
  
class TwitterClient(object): 
    ''' 
    Generic Twitter Class for sentiment analysis. 
    '''
    def __init__(self): 
        ''' 
        Class constructor or initialization method. 
        '''
        # keys and tokens from the Twitter Dev Console 
        consumer_key = '19EYFxVRWyuq8foiHt256M7ex'
        consumer_secret = 'U3QIwcFAg1opraIkjYYLSs62jQ3p7AiuGI2cUDOUEPUg8ZIlCk'
        access_token = '950872483183374336-6FlRM4dTq2Hz3qD6vnmXRcOJi5hLvRZ'
        access_token_secret = 'vSGXFEaSqgKXsIoITZExOXVfP9aprv3fnCq3iwJnM8RSX'
  
        # attempt authentication 
        try: 
            # create OAuthHandler object 
            self.auth = OAuthHandler(consumer_key, consumer_secret) 
            # set access token and secret 
            self.auth.set_access_token(access_token, access_token_secret) 
            # create tweepy API object to fetch tweets 
            self.api = tweepy.API(self.auth) 
            # print("SUCCESS")
        except: 
            print("Error: Authentication Failed") 
  
    def clean_tweet(self, tweet): 
        ''' 
        Utility function to clean tweet text by removing links, special characters 
        using simple regex statements. 
        '''
        return ' '.join(re.sub("(@[A-Za-z0-9]+)|([^0-9A-Za-z \t]) |(\w+:\/\/\S+)", " ", tweet).split()) 
  
    def get_tweet_sentiment(self, tweet): 
        ''' 
        Utility function to classify sentiment of passed tweet 
        using textblob's sentiment method 
        '''
        # create TextBlob object of passed tweet text 
        analysis = TextBlob(self.clean_tweet(tweet)) 
        # set sentiment 
        if analysis.sentiment.polarity > 0: 
            return 'positive'
        elif analysis.sentiment.polarity == 0: 
            return 'neutral'
        else: 
            return 'negative'
  
    def get_tweets(self, query, count = 10): 
        ''' 
        Main function to fetch tweets and parse them. 
        '''
        # empty list to store parsed tweets 
        tweets = [] 
  
        try: 
            # call twitter api to fetch tweets 
            fetched_tweets = self.api.search(q = query, count = count) 
  
            # parsing tweets one by one 
            for tweet in fetched_tweets: 
                # empty dictionary to store required params of a tweet 
                parsed_tweet = {} 
  
                # saving text of tweet 
                parsed_tweet['text'] = tweet.text 
                # saving sentiment of tweet 
                parsed_tweet['sentiment'] = self.get_tweet_sentiment(tweet.text) 
  
                # appending parsed tweet to tweets list 
                if tweet.retweet_count > 0: 
                    # if tweet has retweets, ensure that it is appended only once 
                    if parsed_tweet not in tweets: 
                        tweets.append(parsed_tweet) 
                else: 
                    tweets.append(parsed_tweet) 
  
            # return parsed tweets 
            return tweets 
  
        except tweepy.TweepError as e: 
            # print error (if any) 
            print("Error : " + str(e)) 
  
def analyze(query_words, counts, api): 

    
    # calling function to get tweets 
    tweets = api.get_tweets(query = query_words, count = counts) 
    negative_percentage = 0
    positive_percentage = 0
    if tweets:
        # picking positive tweets from tweets 
        ptweets = [tweet for tweet in tweets if tweet['sentiment'] == 'positive']
        if len(tweets) != 0:
            positive_percentage =  100*len(ptweets)/len(tweets)
        print("analyzing: " + query_words)
        # percentage of positive tweets 
        print("Positive tweets percentage: {} %".format(positive_percentage)) 
        # picking negative tweets from tweets 
        ntweets = [tweet for tweet in tweets if tweet['sentiment'] == 'negative'] 
        if len(tweets) != 0:
            negative_percentage =  100*len(ntweets)/len(tweets)
        # percentage of negative tweets 
        print("Negative tweets percentage: {} %".format(negative_percentage))
        # percentage of neutral tweets 
        print("Neutral tweets percentage: {} %".format(100 - negative_percentage - positive_percentage))
        # # printing first 5 positive tweets 
        # print("\n\nPositive tweets:") 
        # for tweet in ptweets[:10]: 
        #     print(tweet['text']) 
      
        # # printing first 5 negative tweets 
        # print("\n\nNegative tweets:") 
        # for tweet in ntweets[:10]: 
        #     print(tweet['text']) 
    return [positive_percentage, negative_percentage]
  
if __name__ == "__main__": 
    filename = "acer_supplier_tweet_sentimental_report.csv"
    output = open(filename, "w")
    output.write("company name, positive tweets(%), negative tweets(%), neutral tweets(%)\n")
    counts = 100
    line_cnt = 0
    csv = 'Apple-Supplier-List.csv'
    df = pd.read_csv(csv, names=['Suppliers'], usecols=[0])
    names = list(df.Suppliers.unique())
    # creating object of TwitterClient Class 
    api = TwitterClient() 
    print(len(names))
    # for name in names:
    #     print(line_cnt)
    #     pos, neg = analyze(name, counts, api)
    #     if pos != 0 and neg != 0:
    #         output.write(name + "," + str(pos)[:10] + "," + str(neg)[:10]+ ","+str(100-pos-neg)[:10] +'\n')
    #     line_cnt += 1


