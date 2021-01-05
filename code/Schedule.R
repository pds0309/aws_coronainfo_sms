# 매일 일정한 시간마다 예약실행될 R 스크립트
library(stringr)
library(KoNLP)
library(rvest)
library(DBI)
library(pool)

### aws RDB에 연결 ###
con <- dbConnect(drv = RMariaDB::MariaDB (),
               dbname = 'yourDBname',
               host = "yourDBname.xxxxxxxxxx.ap-northeast-2.rds.amazonaws.com", 
               port=1433 #yourport
               ,user = "yourID", 
               password = "yourPW" 
)

### 단순한 웹 스크래핑 ###
url_ds <- paste0("https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=코로나")
INDEX <- read_html(url_ds) %>%
  html_nodes(".info_title") %>%
  html_text()
INDEX <- INDEX[1:4]
TODAY <- read_html(url_ds) %>%
  html_nodes(".info_variation") %>%
  html_text()
TODAY <- TODAY[1:4]
if(TODAY[4] == "-"){
  TODAY[4] = 0
}
TODAY <- as.numeric(gsub(",","",TODAY))
TOTAL <- read_html(url_ds) %>%
  html_nodes(".info_num") %>%
  html_text()
TOTAL <- TOTAL[1:5]
TOTAL <- as.numeric(gsub(",","",TOTAL))

### DB에 스크래핑한 데이터 삽입 ###
result <- sprintf("INSERT INTO corona (infesum, infetoday, insfsum, insftoday,relsum, reltoday , deadsum, deadtoday) VALUES (%d,%d,%d,%d,%d,%d,%d,%d)",
                  TOTAL[1],TODAY[1],TOTAL[2],
                  TODAY[2],TOTAL[3],TODAY[3],
                  TOTAL[4],TODAY[4])
res <- dbSendQuery(con , result)
dbClearResult(res)
### RDB 연결해제 ###
dbDisconnect(con)

