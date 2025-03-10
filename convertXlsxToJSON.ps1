Import-Module ImportExcel

#Create the sentences json file
$sentences = Import-Excel -Path ".\dataSource.xlsx" -WorksheetName "Sentences"
$sentences | ForEach-Object { $_.ID = [int]$_.ID }
$sentences | ConvertTo-Json | Out-File ".\sentences.json"

#Create the notes json file
$notes = Import-Excel -Path ".\dataSource.xlsx" -WorksheetName "Notes"
$notes | ForEach-Object { $_.ID = [int]$_.ID }
$notes | ConvertTo-Json | Out-File ".\notes.json"