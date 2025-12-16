import React from 'react';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../components/Loading/Loading';

const AssignIssuepage = () => {
     const { user } = useAuth();
     const axiosSecure = useAxiosSecure();

     const { data: staffIssues = [], isLoading } = useQuery({
          queryKey: ["staffIssues", user?.email],
          enabled: !!user?.email,
          queryFn: async () => {
               const res = await axiosSecure.get(
                    `/issues/staff/${user.email}`
               );
               return res.data;
          }
     });

     console.log(staffIssues)

     if(isLoading){
          return <Loading></Loading>
     }
     
     return (
          <div>
              I am a Assingpage 
          </div>
     );
};

export default AssignIssuepage;