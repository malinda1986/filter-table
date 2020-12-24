# Create reports page

The task is to create a page that will list reports in a user-friendly way. It can be accomplished by using any existing web framework/library, or it can be done without them.

Input data for the task: reports.json file can be downloaded from: https://gitlab.com/snippets/1982578
It contains 5000 reports generated randomly, each consisting of:

- Bank name
- Bank BIC
- Report score value
- Type of the report (extended, intermediate, primary)
- Created and published dates

Please create:

- API to serve those reports
- Web-page to consume this API and display data

## Basic functionality:
As it will be difficult to navigate all the results at once, you should add some filters, search and pagination.

Filters could be:
- Published or not published yet (check the publishedAt date) - done
- Type of report: extended | intermediate | primary - done
- Score range: from - to - done
- Only banks that match certain query - done
- Only BICs that match certain query - done


## Optional functionality:
- To improve usability, the table can be sorted by any column.
- Functional or E2E tests

