$path = Read-Host "Type your excel file path"
Import-Module ImportExcel
$sentences = Import-Excel -Path $path
$sentences | ForEach-Object { $_.ID = [int]$_.ID }
$sentences | ConvertTo-Json | Out-File ".\sentences2.json"