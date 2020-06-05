from django.shortcuts import render
from plyer import notification
import requests
from bs4 import BeautifulSoup

def home(request):
    return render(request,'home.html')

def map(request):
    return render(request,'map.html')

def notifyMe(title, message):
    notification.notify(
        title = title,
        message = message,
        app_icon = "C://Users//hp//Desktop//notify//virus.ico",
        timeout= 10
    )

def generate(request):
    
    notifyMe("Covid-19 cases in India",'Total confirmed cases:- 207615 , Total deaths:- 5815, Total active cases:- 101497')
    return render(request,'home.html')

def live(request):
    url='https://www.mohfw.gov.in/'
    r = requests.get(url)
    myHtmlData = r.text
    soup = BeautifulSoup(myHtmlData, 'html.parser')
    #print(soup.prettify())
    myDataStr = ""
    for tr in soup.find_all('tbody')[0].find_all('tr'):
        myDataStr += tr.get_text() 
    myDataStr=myDataStr[1:]
    itemList = myDataStr.split("\n\n")
    
    p=[]
    for item in itemList:
        p.append(item.split('\n'))
    context={'active':p[37][2],'cured':p[38][0],'death':p[39][1],'total':p[40][1], 'state':p[:35] }
    print(p)
    return render(request,'live.html',context)


def update(request):
    url='https://www.mohfw.gov.in/'
    r = requests.get(url)
    myHtmlData = r.text
    soup = BeautifulSoup(myHtmlData, 'html.parser')
    b=[]
    e=[]
    for tr in soup.find_all('section')[1].find_all('a'):
        e=[]
        c=str(tr)
        p=c[9:].index('"')
        e.append(c[9:p+9])
        p=c.index('>')
        f=c[p:].index('<')
        e.append(c[p+1:p+f])
        b.append(e)
    context={'update':b}
    print(b)
    return render(request,'update.html', context)

def quiz(request):
    return render(request,'quiz.html')

def final(request):
    return render(request,'final.html')
