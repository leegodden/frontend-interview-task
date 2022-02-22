/* eslint-disable max-statements */
import { add, format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Button } from "../../components/button";
import RowContainer from "../../components/row-container";

import axios from 'axios';
import {
  AccountHeadline, 
  AccountLabel, 
  AccountList, 
  AccountListItem, 
  AccountSection, 
  InfoText, 
  Inset, 
  ChangesContainer,
  ChangesInfo, 
  Changes, 
  ChangesItems
} from "./style";


// Not used for Valuation Changes
const account = {
  uid: "65156cdc-5cfd-4b34-b626-49c83569f35e",
  deleted: false,
  dateCreated: "2020-12-03T08:55:33.421Z",
  currency: "GBP",
  name: "15 Temple Way",
  bankName: "Residential",
  type: "properties",
  subType: "residential",
  //originalPurchasePrice: 250000,
  originalPurchasePriceDate: "2017-09-03",
  recentValuation: { amount: 310000, status: "good" },
  associatedMortgages: [
    {
      name: "HSBC Repayment Mortgage",
      uid: "fb463121-b51a-490d-9f19-d2ea76f05e25",
      currentBalance: -175000,
    },
  ],
  canBeManaged: false,
  postcode: "BS1 2AA",
  lastUpdate: "2020-12-01T08:55:33.421Z",
  updateAfterDays: 30,
};

const Detail = ({}) => {
	const [valChanges, setValChanges] = useState([]);

	useEffect(() => {
  		fetchValChanges();
}, []);

	// Fetch data from external account.js file ror Valuation changes section only
	const fetchValChanges = () => {
  		axios
    		.get('/api/account')
    		.then((res) => {
      	console.log(res);
      	setValChanges(res.data);
    	})
    		.catch((err) => {
      	console.log(err);
    });
};


  let mortgage;
  const lastUpdate = new Date(account.lastUpdate);
  if (account.associatedMortgages.length) {
    mortgage = account.associatedMortgages[0];
  }


  return (
    <Inset>
      <AccountSection>
        <AccountLabel>Estimated Value</AccountLabel>
        <AccountHeadline>
          {new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
          }).format(account.recentValuation.amount)}
        </AccountHeadline>
        <AccountList>
          <AccountListItem><InfoText>
            {`Last updated ${format(lastUpdate, "do MMM yyyy")}`}
          </InfoText></AccountListItem>
          <AccountListItem><InfoText>
            {`Next update ${format(
              add(lastUpdate, { days: account.updateAfterDays }),
              "do MMM yyyy"
            )}`}
          </InfoText></AccountListItem>
        </AccountList>
      </AccountSection>
      <AccountSection>
        <AccountLabel>Property details</AccountLabel>
        <RowContainer>
          <AccountList>
            <AccountListItem><InfoText>{account.name}</InfoText></AccountListItem>
            <AccountListItem><InfoText>{account.bankName}</InfoText></AccountListItem>
            <AccountListItem><InfoText>{account.postcode}</InfoText></AccountListItem>
          </AccountList>
        </RowContainer>
      </AccountSection>
      {mortgage && (
        <AccountSection>
          <AccountLabel>Mortgage</AccountLabel>
          <RowContainer
            // This is a dummy action
            onClick={() => alert("You have navigated to the mortgage page")}
          >
            <AccountList>
              <AccountListItem><InfoText>
                {new Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }).format(
                  Math.abs(account.associatedMortgages[0].currentBalance)
                )}
              </InfoText></AccountListItem>
              <AccountListItem><InfoText>{account.associatedMortgages[0].name}</InfoText></AccountListItem>
            </AccountList>
          </RowContainer>
        </AccountSection>
       
      )}
      <Button
        // This is a dummy action
        onClick={() => alert("You have navigated to the edit account page")}
      >
        Edit account
      </Button>	


     {/* -- START OF VALUE CHANGES SECTION USING AXIOS FOR API CALL -- */}
	   <AccountSection>
		 <AccountList>
      
		{			
			Object.keys(valChanges).map((change, i) => {
				let sincePurchase = valChanges[change].recentValuation.amount - valChanges[change].originalPurchasePrice;
				let sincePurchasePercentage = sincePurchase / valChanges[change].originalPurchasePrice * 100;

				// Calculate years since purchase date
				function getAge(dateString) {
   				var ageInMilliseconds = new Date() - new Date(dateString);
   				return Math.floor(ageInMilliseconds/1000/60/60/24/365); // convert to years
					}
					
					let purchaseDate = getAge(valChanges[change].originalPurchasePriceDate);
					console.log(purchaseDate);						

				return (
				 <ChangesContainer key={i}>											
					<AccountLabel>Valuation Changes</AccountLabel>
         		<AccountListItem >
			  			<InfoText> Purchased for{' '}
                {new Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }).format(
                  Math.abs(valChanges[change].originalPurchasePrice)						
                )}{' in'} {valChanges.[change].originalPurchasePriceDate}
            </InfoText>
					</AccountListItem>
          <ChangesItems >
              <Changes>				  
                Since Purchase:
                	<ChangesInfo>
							{new Intl.NumberFormat("en-GB", {
                  style: "currency",
                  currency: "GBP",
                }).format(
                  Math.abs(sincePurchase)
                )}{' ('}
					 	{new Intl.NumberFormat("en-GB", {
                  style: "percent",
						 minimumFractionDigits: 2,
   					 maximumFractionDigits: 2,              
                }).format(
                  sincePurchasePercentage / 100 
                )} {')'}
					
						 </ChangesInfo>            
              </Changes>            
              <Changes>
                Annual appreciation: 
                	<ChangesInfo>
						{new Intl.NumberFormat("en-GB", {
                 style: "percent",
						 minimumFractionDigits: 1,
   					 maximumFractionDigits: 1,   
                }).format(
						 sincePurchasePercentage / 100 / purchaseDate
                )}						 
						 </ChangesInfo>            
              </Changes>             
         </ChangesItems>
		 </ChangesContainer>
				)})
		}	
		       
    
      </AccountList>
      </AccountSection>
		
    </Inset>
  );
};

export default Detail;