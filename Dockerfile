# 使用官方 Python 運行時作為基礎映像。
# 建議選擇一個穩定的版本，例如 python:3.9-slim-buster 或 python:3.10-slim-buster
FROM python:3.9-slim-buster

# 設定容器內的工作目錄
WORKDIR /app

# 將本機當前目錄（即專案根目錄）的所有內容複製到容器的 /app 目錄
# 這會把您的 app.py, requirements.txt 等都複製進去
COPY . /app

# 安裝 requirements.txt 中列出的所有 Python 依賴套件
# --no-cache-dir 參數可以讓映像檔更小
RUN pip install --no-cache-dir -r requirements.txt

# 宣告容器將會在哪個端口監聽連接。
# 請確保您的 Python 程式碼（例如 Flask 或 FastAPI 應用）實際在監聽這個端口。
# 如果您的應用程式監聽 8080，這裡就寫 EXPOSE 8080
EXPOSE 8000

# 當容器啟動時執行的命令
# 這裡假設您的主程式檔是 app.py，並且您使用 Python 運行它
# 如果您的主程式檔是 main.py，就改成 ["python", "main.py"]
CMD ["python", "app.py"]
