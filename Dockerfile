FROM python:3.7.2

RUN apt-get update
RUN apt-get install nano
ADD requirements.txt ./
RUN pip install --requirement ./requirements.txt
ADD app.py ./

EXPOSE 5000

CMD ["python", "app.py"]