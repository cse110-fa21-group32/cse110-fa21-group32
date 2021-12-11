# {Decision on whether to include nutrition facts in recipe}

* Status: {accepted}
* Deciders: {all team members} <!-- optional -->
* Date: {2021-12-04} <!-- optional -->

## Context and Problem Statement

We were discussing which cloud service to use for hosting our server.

## Decision Drivers <!-- optional -->

* Cost
* Speed
* Difficulty to set up
* Memory/disk space

## Considered Options

* Google Cloud Platform (GCP)
* Amazon Web Services (AWS)

## Decision Outcome

Chosen option: "{AWS}", because we had trouble obtaining an SSL certificate on GCP. On GCP, the port reserved from HTTP traffic (80) is constantly occupied by Google's services and we couldn't kill the processes. Supporting HTTPS traffic is critical if we want direct access from browsers. Meanwhile, Amazon AWS is less complicated then Google GCP and the tutorials are easy to follow. Although the perfomance is limited, it's good enough for our server since we won't have too much traffic. If needed, we can just upgrade to more powerful instances. Also, our server simply requires a hosting OS. The extra functionalities provided by GCP wouldn't make a difference.

### {GCP}

* Good, $300 free credits for new users
* Good, can choose instances with better performance (for free)
* Good, can choose servers located near California for better internet performance
* Good, lots of functionalities and very flexible
* Bad, too many functionalities, lots of add-ons, and hard to follow all the settings
* Bad, our group account couldn't register a domain name due to its quota limit
* Bad, couldn't obtain an SSL certificate from Let's Encrypt from HTTPS because the certification script failed to run

### {AWS}

* Good, 12-month trial for new users
* Good, simple to set up; well-documented tutorials
* Good, can choose servers located near California for better internet performance
* Bad, not as many functionalities as GCP
* Bad, instance performance is limited compared to GCP (for free trial, only 1 CPU & 1G Memory)

<!-- markdownlint-disable-file MD013 -->