Import-Module ImportExcel

#Create the sentences json file
$sentences = Import-Excel -Path ".\dataSource.xlsx" -WorksheetName "Sentences"
$sentences | ForEach-Object { $_.ID = [int]$_.ID }
$sentences | ConvertTo-Json | Out-File ".\sentences.json"

#Create the notes json file
$notes = Import-Excel -Path ".\dataSource.xlsx" -WorksheetName "Notes"
$notes | ForEach-Object { $_.ID = [int]$_.ID }
$notes | ConvertTo-Json | Out-File ".\notes.json"



<#

$mdFiles = @("chinese_lessons36-40.md","chinese_lessons41-45.md","chinese_lessons46–50.md","chinese_lessons51-55.md","chinese_lessons56–60.md","chinese_lessons61–65.md","chinese_lessons66-70.md","chinese_lessons71-75.md","chinese_lessons76–80.md","chinese_lessons81-85.md","chinese_lessons86-90.md","chinese_lessons91–95.md","chinese_lessons96–100.md")

foreach($mdfilename in $mdFiles){
    $mdfile = Get-Content "./${mdfilename}"

    if($mdfile){
        Write-Host "Working on ${mdfilename}..." -ForegroundColor Yellow
        $mdfile.Replace("**1. Study","## 1. Study").replace("**2. 10-Quest","## 2. 10-Quest").replace("**2. Short-","## 2. Short-").replace("**3. Answer","## 3. Answer").replace("**4. Comprehensive","## 4.  Comprehensive").replace("**5. Grammar","## 5. Grammar").replace("**6. Dialogues","## 6. Dialogues") | Out-File "./${mdfilename}"
    }
}

#>